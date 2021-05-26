from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
import time

url = "https://www.amd.com/de/direct-buy/de"

browser = webdriver.Chrome("/Users/alenmustafic/Desktop/bot/chromedriver")
browser.set_window_size(1024, 600)
browser.maximize_window()
browser.get(url)

element = WebDriverWait(browser, 10).until(
    EC.presence_of_element_located((By.ID, "onetrust-accept-btn-handler"))
)
element.click()

while(True):
    browser.refresh()
    time.sleep(5)