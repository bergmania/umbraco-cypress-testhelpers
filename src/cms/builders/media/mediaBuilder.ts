export class MediaBuilder {
  path : string;
  base64String : string;
  fileName : string;
  parentFolder : number;
  contentTypeAlias: string;
  propertyAlias: string;

  /**
   * Specify the path to read the image from
   * @param path - the path to get the file from
   */
  withPath(path: string){
    this.path = path;
    return this;
  }

  /**
   * Specify the base64 string to generate image data from, will be ignored if path is specified
   * @param base64String - base64 string to generate image data from.
   */
  withBase64String(base64String: string){
    this.base64String = base64String;
    return this;
  }

  /**
   * Specify the name of the file to upload, will attempt to get filename from path if not specified
   * @param fileName - the name of the uploaded file
   */
  withFileName(fileName: string){
    this.fileName = fileName;
    return this;
  }

  /**
   * Specify a parent folder to put the image within, using the ID, defaults to root (-1)
   * @param parentFolderId
   */
  withParentFolder(parentFolderId: number){
    this.parentFolder = parentFolderId;
    return this;
  }

  /**
   * Specify the content type alias of the media type, defaults to auto select.
   * @param contentTypeAlias - content type alias of the media type
   */
  withContentTypeAlias(contentTypeAlias: string){
    this.contentTypeAlias = contentTypeAlias;
    return this;
  }

  /**
   * Specify the property alias of the property to save the image in, defaults to umbracoFile.
   * @param propertyAlias - property alias of the property to save image data in
   */
  withPropertyAlias(propertyAlias: string){
    this.propertyAlias = propertyAlias;
    return this;
  }
  
  build(){
    let fileName = this.fileName;
    if(fileName == null && this.path !== null){
      let pathParts = this.path.split("/");
      fileName = pathParts[pathParts.length - 1];
    }
    
    return {
      path: this.path || null,
      base64String: this.base64String || null,
      fileName: fileName,
      parentFolder: this.parentFolder || -1,
      contentTypeAlias: this.contentTypeAlias || 'umbracoAutoSelect',
      propertyAlias: this.propertyAlias || 'umbracoFile'
    }
  }

  }