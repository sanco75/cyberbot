from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.chrome.options import Options as ChromeOptions
import requests
import time
import sys
import os

API_KEY = "847303b07e43a42c94c9df3e967bd940"
data_sitekey = '6LdDuaYaAAAAAAh4ZMFCEtrimC-CgXhlSFRrZuN9'
page_url ='https://www.amd.com/de/direct-buy/5450881600/de'



def Solver():
    driver = webdriver.Chrome("/Users/alenmustafic/Desktop/bot/chromedriver")
    driver.get(page_url)

    element = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.ID, "onetrust-accept-btn-handler"))
    )
    element.click()

    pricefind = driver.find_element_by_xpath("//h4")
    price = pricefind.get_attribute("innerHTML").splitlines()[0]

    modelfind = driver.find_element_by_xpath("//div[@class='product-page-description col-flex-lg-5 col-flex-sm-12']//h2")
    model = modelfind.get_attribute("innerHTML").splitlines()[0]

    imgfind = driver.find_element_by_xpath("//div[@class='product-page-image col-flex-lg-7 col-flex-sm-12']//img")
    img = imgfind.get_attribute("src").splitlines()[0]

    element2 = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.XPATH, "//div[@class='product-page-description col-flex-lg-5 col-flex-sm-12']//button[@class='btn-shopping-cart btn-shopping-neutral use-ajax']"))
    )
    driver.execute_script("arguments[0].click();", element2)

    time.sleep(5)

    u1 = f"https://2captcha.com/in.php?key={API_KEY}&method=userrecaptcha&googlekey={data_sitekey}&pageurl={page_url}&json=1&invisible=1"
    r1 = requests.get(u1)
    print(r1.json())
    rid = r1.json().get("request")
    u2 = f"https://2captcha.com/res.php?key={API_KEY}&action=get&id={int(rid)}&json=1"
    time.sleep(5)
    while True:
        r2 = requests.get(u2)
        print(r2.json())
        if r2.json().get("status") == 1:
            form_tokon = r2.json().get("request")
            break
        time.sleep(5)
    wirte_tokon_js = f'document.getElementById("g-recaptcha-response").innerHTML="{form_tokon}";'
    #submit_js = 'document.getElementById("recaptcha-demo-form").submit();'
    driver.execute_script(wirte_tokon_js)
    #time.sleep(3)
    #driver.execute_script(submit_js)
    time.sleep(45)

if __name__ == '__main__':
    Solver()