export const filetype = {
  documents: [
    { type: 'application/pdf', image: '/assets/images/file-pdf.png' }, // PDF
    { type: 'application/msword', image: '/assets/images/file-doc.png' }, // .doc
    { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', image: '/assets/images/file-docx.png' }, // .docx
    { type: 'text/plain', image: '/assets/images/file-txt.png' }, // .txt
  ],
    
  images: [
    { type: 'image/jpeg', image: '/public/images/jpeg-icon.png' }, // .jpg, .jpeg
    { type: 'image/png', image: '/public/images/png-icon.png' }, // .png
    { type: 'image/gif', image: '/public/images/gif-icon.png' }, // .gif
  ],
  

  media: [
    {type:'audio/mpeg',image:'/assets/images/Music.png'},         // .mp3
    {type:'video/mp4',image:'/assets/images/Video.png'}              // .mp4
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
          { type: 'application/pdf', image: '/public/images/pdf-icon.png' }, // PDF
          { type: 'application/msword', image: '/public/images/doc-icon.png' }, // .doc
          { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', image: '/public/images/docx-icon.png' }, // .docx
          { type: 'text/plain', image: '/public/images/txt-icon.png' }, // .txt
        ],},
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
          { type: 'image/jpeg', image: '/public/images/jpeg-icon.png' }, // .jpg, .jpeg
          { type: 'image/png', image: '/public/images/png-icon.png' }, // .png
          { type: 'image/gif', image: '/public/images/gif-icon.png' }, // .gif
        ],},
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
        {type:'audio/mpeg',image:'/public/assets/images/Music.png'},         // .mp3
        {type:'video/mp4',image:'/public/assets/images/Video.png'}              // .mp4
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
      color:'bg-violet-500',
      shadowcolor:'shadow-sm shadow-violet-500/50'
  }

]