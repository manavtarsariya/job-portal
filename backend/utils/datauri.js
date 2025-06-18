import DataUriParser from "datauri/parser.js"
import path from "path"




const getDataUri = (file) => {
    const parser = new DataUriParser();



    const extName = path.extname(file.originalname).toString()
    // This line extracts the file extension (e.g., .png, .jpg) from the uploaded file's name and converts it into a string. with the help of path library

    return parser.format(extName, file.buffer);
    // this line coTverts the file buffer (binary data) into a Data URI with the correct file type.
}

export default getDataUri


// A Data URI is a way to encode binary data (like images or files) into a string format that can be directly embedded into web pages or applications