import os
import shutil
from fastapi import UploadFile, HTTPException, status

MAX_FILE_SIZE = 50 * 1024 * 1024  # 50 MB

ALLOWED_CONTENT_TYPES = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",  # .docx
]

ALLOWED_EXTENSIONS = [".pdf", ".docx"]

def Validate_file(file: UploadFile):
    """
    this will validate the file type and ensure that it exists
    FASTAPI upload file doesnt load the whole file in the memory, it streams the file in chunks, so we can check the file size by reading the chunks
    """

    if not file:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No file uploaded")
    
    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail="only .pdf and .docx files are allowed"
            )
    
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail="File extension must be .pdf or .docx"
            )
    
    return ext

def save_document_version(file: UploadFile, department_code: str, document_code: str, revision_number: int) -> str:
    """
    save the file to local disk and returns the relative file path.
    structure: storage/{department_code}/{document_code}/revision_{revision_number}/{original_filename}
    """

    ext = Validate_file(file)

    base_upload_dir = "uploads"
    dept_dir = os.path.join(base_upload_dir, department_code)
    doc_dir = os.path.join(dept_dir, document_code)

    # this will ensure that the directory exists
    os.makedirs(doc_dir, exist_ok=True)
    filename = f"{document_code}-R{revision_number}{ext}"
    file_path = os.path.join(doc_dir, filename)

    file_size = 0
    try:
        with open(file_path, "wb") as buffer:
            while chunk := file.file.read(1024 * 1024):  # read in 1MB chunks
                file_size += len(chunk)
                if file_size > MAX_FILE_SIZE:
                    raise HTTPException(
                        status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                        detail="File size exceeds the maximum limit of 50 MB"
                    )
                buffer.write(chunk)

    finally:
        file.file.close()

    return file_path    
                    