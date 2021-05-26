from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
import requests
import time

url = "https://www.amd.com/de/direct-buy/5450881600/de"

browser = webdriver.Chrome("/Users/alenmustafic/Desktop/bot/chromedriver")
browser.maximize_window()
browser.get(url)

element = WebDriverWait(browser, 10).until(
    EC.presence_of_element_located((By.ID, "onetrust-accept-btn-handler"))
)
element.click()

pricefind = browser.find_element_by_xpath("//h4")
price = pricefind.get_attribute("innerHTML").splitlines()[0]

modelfind = browser.find_element_by_xpath("//div[@class='product-page-description col-flex-lg-5 col-flex-sm-12']//h2")
model = modelfind.get_attribute("innerHTML").splitlines()[0]

imgfind = browser.find_element_by_xpath("//div[@class='product-page-image col-flex-lg-7 col-flex-sm-12']//img")
img = imgfind.get_attribute("src").splitlines()[0]

element2 = WebDriverWait(browser, 10).until(
    EC.presence_of_element_located((By.XPATH, "//div[@class='product-page-description col-flex-lg-5 col-flex-sm-12']//button[@class='btn-shopping-cart btn-shopping-neutral use-ajax']"))
)
browser.execute_script("arguments[0].click();", element2)

element3 = WebDriverWait(browser, 10).until(
    EC.presence_of_element_located((By.XPATH, "//div[@class='recaptcha-checkbox-border']"))
)
browser.execute_script("arguments[0].click();", element3)

time.sleep(15)
browser.quit()