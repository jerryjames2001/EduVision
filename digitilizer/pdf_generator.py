from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter

def text_to_pdf(text, filename):
    c = canvas.Canvas(filename, pagesize=letter)
    width, height = letter
    
    text_object = c.beginText(40, height - 40)
    text_object.setFont("Helvetica", 12)
    
    for line in text.split('\n'):
        text_object.textLine(line)
    
    c.drawText(text_object)
    c.save()