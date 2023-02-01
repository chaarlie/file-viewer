export enum ButtonFamily {
    FILLED = 'bg-sky-400 hover:bg-sky-500 col-span-1 h-full text-white p-1 hover:text-slate-50 text-lg',
    OUTLINE = 'bg-transparent hover:bg-gray-100 border border-slate-300 border-solid p-1 col-span-1 text-red-600 text-lg',
    PAUSE = 'bg-sky-400 m-auto p-2 rounded-lg text-lg',
    PLAY = 'bg-sky-400 hover:bg-sky-500 p-2 rounded-full m-auto text-lg',
}

export enum UploadMessage {
    UPLOAD_FORM_PROCESSING = 'Processing ...',
    UPLOAD_FORM_SELECT_FILE = 'Select File',
    UPLOAD_FORM_UPLOAD_COMPLETE = 'Upload Complete!',
}
