# Playwright-OrderAutomation

## Project Overview

This project is an end-to-end Playwright automation framework developed using the Page Object Model (POM) design pattern. It automates the complete order placement workflow, validates invoice PDF data, and compares UI values with PDF values to ensure accuracy.

The framework is designed to be scalable, maintainable, and reusable for real-world e-commerce automation testing.

---

## Features

* End-to-End Order Placement Automation
* Page Object Model (POM) Framework
* Payment Gateway Automation
* Invoice PDF Download
* PDF Parsing and Data Extraction
* UI vs PDF Validation
* Invoice Calculation Validation
* JSON-based Test Data Management
* Configurable Playwright Framework
* Screenshot and Video Capture on Failure
* HTML Report Generation
* Git & GitHub Version Control

## Tech Stack

- **Automation Tool:** Playwright
- **Programming Language:** JavaScript (ES6+)
- **Test Framework:** Playwright Test
- **Design Pattern:** Page Object Model (POM)
- **PDF Parsing:** pdf-parse
- **Version Control:** Git
- **Repository Hosting:** GitHub
- **IDE:** Visual Studio Code
- **Package Manager:** npm


## Project Structure

```text
Playwright-OrderAutomation/
│── pages/                 # Page Object Model classes
│── tests/                 # Test scripts
│── testData/              # JSON test data
│── utils/                 # Utility functions (PDF Parser, Validators, etc.)
│── downloads/             # Downloaded invoice PDFs
│── playwright.config.js   # Playwright configuration
│── package.json           # Project dependencies
│── README.md              # Project documentation
│── .gitignore             # Ignored files
```

## Installation

### Clone the Repository

```bash
git clone https://github.com/ramansingh8747/Playwright-OrderAutomation.git
```

### Navigate to the Project

```bash
cd Playwright-OrderAutomation
```

### Install Dependencies

```bash
npm install
```

### Install Playwright Browsers

```bash
npx playwright install
```

## Run Tests

### Run All Tests

```bash
npx playwright test
```

### Run Tests in Headed Mode

```bash
npx playwright test --headed
```

### Run Specific Test

```bash
npx playwright test tests/orderFlow.spec.js
```

### View HTML Report

```bash
npx playwright show-report
```