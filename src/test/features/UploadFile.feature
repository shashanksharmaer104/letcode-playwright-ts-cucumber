Feature: Upload a file

#@uploadimage
# Scenario Outline: User uploads a PNG image
#     Given User navigates to Image Resizer application
#     And User upload a file "uploadImage.png"

@sampleuploadimage
Scenario Outline: User uploads a file
    Given User navigates to Selenium-Playground application
    And User upload a sample file "uploadImage.png"