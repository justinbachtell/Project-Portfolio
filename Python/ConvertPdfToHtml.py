'''
Author: Justin Bachtell

API Source:
PDF.co. (n.d.). Convert PDF To HTML From Uploaded File - Python. PDF.co API. Retrieved December 7, 2021, from https://apidocs.pdf.co/18-pdf-to-html-python-convert-pdf-to-html-from-uploaded-file. 

*Requires the installation of the requests module (via command line):
    OSX/Linux/Windows commands (choose 1):
        python3 -m pip install requests
        pip3 install requests
'''

import os
import requests # pip3 install requests
import sys

# The authentication key (API Key)
API_KEY = "jjbachtell@liberty.edu_4a9b0a1f791c0895883ce5caf098a4ef5fd6"

# Base URL for PDF.co Web API requests
BASE_URL = "https://api.pdf.co/v1"

print("**** PDF to HTML Converter - A Custom PDF.co API **** \nPlease verify that the source file is in the same directory as this converter.")

n = 1

# indefinite iteration to loop back through API after it finishes consuming
while n == 1:

    # prompt user for PDF file to convert to HTML
    inputFile = input("Enter the PDF file name, without the extension, or press Enter/Return to exit: ")

    # exit condition to stop the iteration
    if inputFile == "":
        print("Thank you for using the converter.")
        sys.exit()

    # if exit condition is not met, continue to consume the API
    else:
        # append .pdf to the filename
        SourceFile = inputFile + ".pdf"

        # prompt user for HTML filename that outputs
        outputFile = input("Enter the output HTML file name, without the extension: ")

        # append .html to filename
        DestinationFile = outputFile + ".html"

    # Comma-separated list of page indices (or ranges) to process. Leave empty for all pages. Example: '0,2-5,7-'.
    Pages = ""

    # PDF document password. Leave empty for unprotected documents.
    Password = ""


    # Set to $true to get simplified HTML without CSS. Default is the rich HTML keeping the document design.
    PlainHtml = False

    # Set to $true if your document has the column layout like a newspaper.
    ColumnLayout = False

    print("Processing. Please wait...")

    def main(args = None):
        # consume API
        try:
            uploadedFileUrl = uploadFile(SourceFile)
            if (uploadedFileUrl != None):
                convertPdfToHtml(uploadedFileUrl, DestinationFile)
        
        # If a FileNotFoundError is encountered when user enters filename extensions, exit the program
        except FileNotFoundError:
            print("Please do not include the extension in the filename.")
            sys.exit()

    def convertPdfToHtml(uploadedFileUrl, DestinationFile):
        """Converts PDF to Html using PDF.co Web API"""

        # Prepare requests params as JSON
        # See documentation: https://apidocs.pdf.co
        parameters = {}
        parameters["name"] = os.path.basename(DestinationFile)
        parameters["password"] = Password
        parameters["pages"] = Pages
        parameters["simple"] = PlainHtml
        parameters["columns"] = ColumnLayout
        parameters["url"] = uploadedFileUrl

        # Prepare URL for 'PDF To Html' API request
        url = "{}/pdf/convert/to/html".format(BASE_URL)

        # Execute request and get response as JSON
        response = requests.post(url, data=parameters, headers={ "x-api-key": API_KEY })
        if (response.status_code == 200):
            json = response.json()

            if json["error"] == False:
                #  Get URL of result file
                resultFileUrl = json["url"]            
                # Download result file
                r = requests.get(resultFileUrl, stream=True)
                if (r.status_code == 200):
                    with open(DestinationFile, 'wb') as file:
                        for chunk in r:
                            file.write(chunk)
                    print(f"Conversion complete. Output file saved as \"{DestinationFile}\" file.")
                else:
                    print(f"Request error: {response.status_code} {response.reason}")
            else:
                # Show service reported error
                print(json["message"])
        else:
            print(f"Request error: {response.status_code} {response.reason}")

    def uploadFile(fileName):
        """Uploads file to the cloud"""
        
        # 1. RETRIEVE PRESIGNED URL TO UPLOAD FILE.

        # Prepare URL for 'Get Presigned URL' API request
        url = "{}/file/upload/get-presigned-url?contenttype=application/octet-stream&name={}".format(
            BASE_URL, os.path.basename(fileName))
        
        # Execute request and get response as JSON
        response = requests.get(url, headers={ "x-api-key": API_KEY })
        if (response.status_code == 200):
            json = response.json()
            
            if json["error"] == False:
                # URL to use for file upload
                uploadUrl = json["presignedUrl"]
                # URL for future reference
                uploadedFileUrl = json["url"]

                # 2. UPLOAD FILE TO CLOUD.
                with open(fileName, 'rb') as file:
                    requests.put(uploadUrl, data=file, headers={ "x-api-key": API_KEY, "content-type": "application/octet-stream" })

                return uploadedFileUrl
            else:
                # Show service reported error
                print(json["message"])    
        else:
            print(f"Request error: {response.status_code} {response.reason}")

        return None

    if __name__ == '__main__':
        main()