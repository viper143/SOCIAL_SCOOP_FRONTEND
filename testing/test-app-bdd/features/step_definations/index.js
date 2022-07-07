const { expect } = require("chai");
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { Builder, By, Key, until, sleep, WebElement } = require("selenium-webdriver");
const { delay } = require("../utils/delay");

// register test
// Given("Test Register Functionality", { timeout: 50000 }, async function () {
//   let driver = await new Builder().forBrowser("chromen").build();
//   await driver.get("http://localhost:3000/register");
//   await driver.findElement(By.id("emailaddress")).sendKeys("hello.com");
//   await driver.findElement(By.id("username")).sendKeys("nabin122");
//   await driver.findElement(By.id("password")).sendKeys("rabin122");
//   await driver.sleep(delay);
//   await driver.findElement(By.id("registerButton")).click();
//   await driver.wait(until.elementLocated(By.id("registerForm")), 50000);
//   expect(await driver.wait(until.elementLocated(By.id("registerForm"))));
//   await driver.get("http://localhost:3000/login");
//   // await driver.quit();
// });

Given("Test Register Functionality", { timeout: 50000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/login");
  await driver.findElement(By.id("register")).click();
  await driver.findElement(By.id("emailaddress")).sendKeys("hello.com");
  await driver.findElement(By.id("username")).sendKeys("nabin122");
  await driver.findElement(By.id("password")).sendKeys("rabin122");
  await driver.sleep(delay);
  await driver.findElement(By.id("registerButton")).click();
    await driver.wait(until.elementLocated(By.id("registerForm")), 50000);
  expect(await driver.wait(until.elementLocated(By.id("registerForm"))));
  await driver.get("http://localhost:3000/login");
 await driver.quit();

  // await driver.quit();
});

// login test
Given("Test Login Functionality", { timeout: 50000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/login");
  await driver.findElement(By.id("email")).sendKeys("rabin@gmail.com");
  await driver.findElement(By.id("password")).sendKeys("rabin122");
  await driver.sleep(delay);
  await driver.findElement(By.id("loginButton")).click();

  await driver.wait(until.elementLocated(By.id("loginForm")), 50000);
  expect(await driver.wait(until.elementLocated(By.id("loginForm"))));
  // await driver.quit();
  await driver.get("http://localhost:3000");
});



// // room details
// Given("Test Add Room Details Functionality", { timeout: 30000 }, async function () {
//   let driver = await new Builder().forBrowser("chrome").build();
//   await driver.get("http://localhost:5000/add-room/3/room-details");
//   // await driver.findElement(By.id("room_type")).click().sendKeys("Single Sitter");
//   element = driver.find_element_by_class_name('form-select')
//   await driver.execute_script("arguments[0].click();", element);
//   await driver.findElement(By.id("room_size")).sendKeys("500");
//   await driver.sleep(delay);
//   await driver.findElement(By.id("continueButton")).click();

//   await driver.wait(until.elementLocated(By.id("roomForm")), 30000);
//   expect(await driver.wait(until.elementLocated(By.id("roomForm"))));
//   // await driver.quit();
//   await driver.get("http://localhost:5000/add-room/3/bathroom-features");
// });

		

// // bathroom features
// Given("Test Add Bathroom Fea Functionality", { timeout: 30000 }, async function () {
//   let driver = await new Builder().forBrowser("chrome").build();
//   await driver.get("http://localhost:5000/add-room/3/bathroom-features");
//   await driver.findElement(By.id("privateRadioButton")).click();
//   await driver.findElement(By.id("Shower")).click();
//   await driver.findElement(By.id("Toilet")).click();
//   await driver.findElement(By.id("BathroomSlippers")).click();
//   await driver.findElement(By.id("HandWash")).click();
//   await driver.sleep(delay);
//   await driver.findElement(By.id("continueButton")).click();

//   await driver.wait(until.elementLocated(By.id("roomForm")), 30000);
//   expect(await driver.wait(until.elementLocated(By.id("roomForm"))));
//   // await driver.quit();
//   await driver.get("http://localhost:5000/add-room/3/amenities");
// });



// // amenities
// Given("Test Add Amenities Functionality", { timeout: 30000 }, async function () {
//   let driver = await new Builder().forBrowser("chrome").build();
//   await driver.get("http://localhost:3000/add-room/3/amenities");
//   await driver.findElement(By.id("tv")).click();
//   await driver.findElement(By.id("wifi")).click();
//   await driver.findElement(By.id("tea")).click();
//   await driver.sleep(delay);
//   await driver.findElement(By.id("continueButton")).click();

//   await driver.wait(until.elementLocated(By.id("roomForm")), 30000);
//   expect(await driver.wait(until.elementLocated(By.id("roomForm"))));
//   // await driver.quit();
//   await driver.get("http://localhost:3000");
// });



// // room title
// Given("Test Add Room Title Functionality", { timeout: 30000 }, async function () {
//   let driver = await new Builder().forBrowser("chrome").build();
//   await driver.get("http://localhost:3000/add-room/3/room-title");
//   await driver.findElement(By.id("room_title")).sendKeys("Double Room");
//   await driver.findElement(By.id("room_price")).sendKeys("15,000");
//   await driver.sleep(delay);
//   await driver.findElement(By.id("roomContinueButton")).click();

//   await driver.wait(until.elementLocated(By.id("roomForm")), 30000);
//   expect(await driver.wait(until.elementLocated(By.id("roomForm"))));
//   // await driver.quit();
//   await driver.get("http://localhost:3000/add-room/3/room-details");
// });


