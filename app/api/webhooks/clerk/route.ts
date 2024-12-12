import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { clerkClient, WebhookEvent } from '@clerk/nextjs/server'
import { CreateUser,UpdateUser,deleteUser } from '@/lib/actions/user.actions'
import { NextResponse } from 'next/server'


export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt: WebhookEvent

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }

  const { id } = evt.data
  const eventType = evt.type
  console.log(id,eventType);

  //create 
  if(eventType=="user.created"){
    const {id,first_name,email_addresses,image_url}=evt.data;
    const full_name=first_name;

    const user={
        clerkId:id,
        fullname:full_name,
        email:email_addresses[0].email_address,
        avatar:image_url
    }
    const  newuser=await CreateUser(user);
    const client=await clerkClient();

 if(newuser){
    await client.users.updateUserMetadata(id,{
      publicMetadata:{
        userId:newuser._id
      }
    });
  
 }

    return NextResponse.json({ message: "OK", user: newuser });
  }

  //update
  if (eventType == "user.updated") {
    const {id,first_name,email_addresses,image_url}=evt.data;
    const full_name=first_name;

    const user={
      clerkId:id,
      fullname:full_name,
      email:email_addresses[0].email_address,
      avatar:image_url
  }
  
    const updatedUser = await UpdateUser(id, user);
  
    return NextResponse.json({ message: "OK", user: updatedUser });
  }
  
  // DELETE
  if (eventType == "user.deleted") {
    const { id } = evt.data;
  
    const deletedUser = await deleteUser(id!);
  
    return NextResponse.json({ message: "OK", user: deletedUser });
  }
  
    console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
    console.log('Webhook body:', body)
    
    
    return NextResponse.json({ message: "OK", user: "deleted !" });
    
  }
