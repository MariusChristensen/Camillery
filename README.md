# Camillery

A beautiful shared gallery application built with React Native and Expo, featuring a modern UI with a nature-inspired color scheme. Share and explore photos with friends and family in an elegant, easy-to-use interface.

## 🌿 Features

- **Modern UI**: Clean and intuitive interface with a nature-inspired color palette
- **Photo Gallery**: Responsive grid layout for viewing photos
- **Categories**: Organize and filter photos by categories
- **Image Upload**: Easy photo uploading functionality
- **Authentication**: Secure user authentication with Firebase
- **Real-time Updates**: Live updates when new photos are shared

## 🚀 Tech Stack

- **Frontend Framework**: React Native
- **Development Platform**: Expo
- **Authentication & Database**: Firebase
- **Navigation**: Expo Router
- **UI Components**: Custom components with React Native core components
- **Icons**: @expo/vector-icons (Ionicons)

## 📱 Installation

1. **Prerequisites**:

   - Node.js (v14 or newer)
   - npm or yarn
   - Expo Go app on your mobile device

2. **Clone the repository**:

   ```bash
   git clone https://github.com/MariusChristensen/Camillery.git
   cd Camillery
   ```

3. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

4. **Environment Setup**:
   Create a `.env` file in the root directory with your Firebase configuration:

   ```
   EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

5. **Start the development server**:

   ```bash
   npx expo start
   ```

6. **Run on your device**:
   - Scan the QR code with your phone's camera (iOS) or the Expo Go app (Android)
   - Or run on a simulator/emulator by pressing 'i' (iOS) or 'a' (Android) in the terminal

## 🎨 Color Scheme

- Primary (Dark Green): `#0e4434`
- Secondary (Warm Brown): `#9e7653`
- Background: `#ffffff`
- Text: `#000000`
- Error: `#dc2626`
- Success: `#059669`

## 📁 Project Structure

```
Camillery/
├── app/                    # Main application screens
│   ├── (tabs)/            # Tab-based navigation screens
│   └── auth/              # Authentication screens
├── components/            # Reusable UI components
│   └── ui/               # Core UI components
├── constants/            # Theme and configuration constants
├── contexts/            # React Context providers
└── config/              # Application configuration
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
