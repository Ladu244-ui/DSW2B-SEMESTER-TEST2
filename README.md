# ShopEZ - Mobile Shopping App

**React Native Application**  
**Marks: 60**  

ShopEZ is a mobile shopping application built with **React Native** and **Firebase**. Users can register, log in, browse products from the Fake Store API, view product details, add products to their cart, and persist cart data in Firebase Realtime Database. The app retains login state across restarts and implements offline cart persistence using AsyncStorage.

---

## Table of Contents

- [Features](#features)  
- [Screens](#screens)  
- [Project Setup](#project-setup)  
- [Installation](#installation)  
- [Firebase Configuration](#firebase-configuration)  
- [Usage](#usage)  
- [Dependencies](#dependencies)  
- [Screenshots](#screenshots)  

---

## Features

- **User Authentication**
  - Email/password registration and login using Firebase Auth
  - Input validation and error handling
  - Persistent login state across app restarts
  - Logout functionality

- **Product Listing & Navigation**
  - Fetch products from [Fake Store API](https://fakestoreapi.com/products)
  - Scrollable product list with image, title, and price
  - Product detail screen with full info and "Add to Cart" button
  - Category filtering for product list
  - React Navigation for smooth screen transitions

- **Shopping Cart & User Data**
  - Add/remove products to cart
  - Modify product quantity
  - Cart stored in Firebase Realtime Database under user-specific paths
  - Real-time cart synchronization
  - Offline cart persistence using AsyncStorage

- **UI Design & Styling**
  - Clean and responsive layout with React Native StyleSheet
  - Consistent buttons, inputs, and list items
  - Visual feedback on button presses
  - Headers indicating current screen

---

## Screens

1. Registration & Login  
2. Product List  
3. Product Detail  
4. Cart  

---

## Project Setup

1. Initialize a new React Native project (Expo CLI recommended):

```bash
npx create-expo-app ShopEZ
cd ShopEZ
