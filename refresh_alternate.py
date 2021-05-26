from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
import time

url = "https://www.alternate.de/MSI/GeForce-RTX-3060-Ti-Gaming-X-Grafikkarte/html/product/1714488"

browser = webdriver.Chrome("/Users/alenmustafic/Desktop/bot/chromedriver")
browser.set_window_size(1024, 600)
browser.maximize_window()
browser.get(url)

element = WebDriverWait(browser, 10).until(
    EC.presence_of_element_located((By.CLASS_NAME, "cookie-submit-all"))
)
element.click()

while(True):
    browser.refresh()
    time.sleep(3)