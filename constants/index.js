export const filetype = {
    documents: [
      'application/pdf',       // PDF
      'application/msword',    // .doc
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
      'text/plain'    , // .txt
    ],
    
    images: [
      'image/jpeg',            // .jpg, .jpeg
      'image/png',             // .png
      'image/gif'              // .gif
    ],
  
    media: [
      'audio/mpeg',            // .mp3
      'video/mp4'              // .mp4
    ]
  };

export const filetypecolor={
  documents:'bg-brand-100',
  images:'bg-blue-500',
  media:'bg-green-400',
  others:'bg-violet-400',
}

export const homepagenavitems=[
  {
      src:'/assets/icons/dashboard.svg',
      width:24,
      height:24,
      name:'Dashboard',
      link:'/'
  },
  {
      src:'/assets/icons/documents.svg',
      width:24,
      height:24,
      name:'Documents',
      link:'/documents',
      mimetype:{
        documents: [
        'application/pdf',       // PDF
        'application/msword',    // .doc
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
        'text/plain'             // .txt
      ]},
      color:'bg-brand',
      shadowcolor:'shadow-sm shadow-red'
  },
  {
      src:'/assets/icons/images.svg',
      width:24,
      height:24,
      name:'Images',
      link:'/images',
      mimetype:{
        images: [
        'image/jpeg',            // .jpg, .jpeg
        'image/png',             // .png
        'image/gif'              // .gif
      ]},
      color:'bg-blue',
      shadowcolor:'shadow-sm shadow-blue'
  },
  {
      src:'/assets/icons/video.svg',
      width:24,
      height:24,
      name:'Media',
      link:'/media',
      mimetype: {
        media: [
        'audio/mpeg',            // .mp3
        'video/mp4'              // .mp4
      ]},
      color:'bg-green',
      shadowcolor:'shadow-sm shadow-green'
  },
  {
      src:'/assets/icons/others.svg',
      width:24,
      height:24,
      name:'Others',
      link:'/others',
      color:'bg-violet-400',
      shadowcolor:'shadow-sm shadow-violet-500/50'
  }

]