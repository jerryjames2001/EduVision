import torch
import torch.nn as nn
import torchvision.models as models
import cv2
import numpy as np
from spellchecker import SpellChecker
import os

class ResNetModel(nn.Module):
    def __init__(self, num_classes=657):
        super(ResNetModel, self).__init__()
        self.model = models.resnet18(weights=None)
        self.model.conv1 = nn.Conv2d(3, 64, kernel_size=7, stride=2, padding=3, bias=False)
        self.model.fc = nn.Linear(512, num_classes)

    def forward(self, x):
        return self.model(x)

def load_model(model_path, device, num_classes=657):
    model = ResNetModel(num_classes).to(device)
    model.load_state_dict(torch.load(model_path, map_location=device, weights_only=True))
    model.eval()
    return model

def preprocess_image(image_path, img_width=128, img_height=32, device=None):
    image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    image = cv2.cvtColor(image, cv2.COLOR_GRAY2RGB)
    image = cv2.resize(image, (img_width, img_height))
    image = image / 255.0
    image = np.transpose(image, (2, 0, 1))  # CHW format
    image = np.expand_dims(image, axis=0)   # Add batch dimension
    image = torch.from_numpy(image).float().to(device)
    return image

def predict_text(model, image, index_to_char):
    with torch.no_grad():
        outputs = model(image)
    _, predicted = torch.max(outputs, 1)
    text = index_to_char[predicted.item()]
    return text

def postprocess_text(text):
    spell = SpellChecker()
    corrected_text = []
    for word in text.split():
        corrected_word = spell.correction(word)
        corrected_text.append(corrected_word if corrected_word else word)
    return ' '.join(corrected_text)

def main():
    model_path = 'handwriting_model.pth'
    image_folder = 'test_images'
    output_dir = 'output'
    output_file = os.path.join(output_dir, 'extracted_text.txt')
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    
    # Create the output directory
    os.makedirs(output_dir, exist_ok=True)
    
    # Load the model
    model = load_model(model_path, device)
    
    # Define index_to_char (replace this with your actual mapping)
    index_to_char = {i: chr(i) for i in range(657)}  # Placeholder
    
    # Process images
    with open(output_file, 'w', encoding='utf-8') as f:  # Fix here
        for image_name in os.listdir(image_folder):
            image_path = os.path.join(image_folder, image_name)
            if image_path.endswith(('.jpg', '.png')):
                preprocessed_image = preprocess_image(image_path, device=device)
                text = predict_text(model, preprocessed_image, index_to_char)
                corrected_text = postprocess_text(text)
                f.write(f"Image: {image_name}\nPredicted Text: {text}\nCorrected Text: {corrected_text}\n" + "-" * 50 + "\n")
                print(f"Image: {image_name}\nPredicted Text: {text}\nCorrected Text: {corrected_text}\n" + "-" * 50)

if __name__ == '__main__':
    main()