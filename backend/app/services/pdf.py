import fitz
import io


def extract_text_from_pdf(file_bytes: bytes) -> str:
    pdf = fitz.open(stream=io.BytesIO(file_bytes), filetype="pdf")
    text = ""
    for page in pdf:
        text += page.get_text()
    pdf.close()
    return text
