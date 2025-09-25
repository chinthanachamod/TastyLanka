# 🍛 TastyLanka - Sri Lankan Food Discovery App

TastyLanka is a comprehensive mobile application for discovering, exploring, and sharing traditional Sri Lankan cuisine. Built with React Native and Expo, this app connects food enthusiasts with authentic Sri Lankan dishes from across the island's diverse regions.

## 📱 Features

### 🔐 Authentication & User Management
- **Firebase Authentication** with email/password and Google Sign-In
- **User Profiles** with customizable profile pictures
- **Secure Session Management** with persistent login state

### 🍽️ Food Discovery
- **Browse Foods** by region (Jaffna, Kandy, Colombo, etc.)
- **Category Filtering** (Desserts, Main Courses, Snacks, etc.)
- **Detailed Food Information** with descriptions, images, and restaurant locations
- **User-Generated Content** - Add your own favorite dishes
- **Interactive Food Cards** with ratings and favorite counts

### ⭐ Rating & Reviews System
- **Rate Foods** on a 5-star scale
- **Add Reviews** with detailed feedback
- **View Community Ratings** and reviews from other users
- **Personal Rating History** tracking

### ❤️ Favorites Management
- **Save Favorite Foods** for quick access
- **Personal Favorites Collection** with easy management
- **Favorites Counter** showing community popularity

### 🌍 Internationalization
- **Multi-language Support** (English/Sinhala)
- **Localized Content** with i18next integration
- **Dynamic Language Switching**

### 🎨 UI/UX Features
- **Dark/Light Theme Toggle** for comfortable viewing
- **Responsive Design** optimized for all screen sizes
- **Smooth Animations** with React Native Reanimated
- **Beautiful Gradients** and modern UI components
- **Video Background** on home screen for immersive experience

### 📍 Location Integration
- **Restaurant Locations** with address and coordinates
- **Regional Food Mapping** showing dishes from specific areas

## 🛠️ Tech Stack

### Frontend
- **React Native** (0.81.4) - Cross-platform mobile development
- **Expo** (54.0.2) - Development platform and deployment
- **TypeScript** - Type-safe development
- **Expo Router** - File-based navigation system
- **NativeWind** - Tailwind CSS for React Native styling
- **React Native Reanimated** - Advanced animations

### Backend & Services
- **Firebase Auth** - User authentication and management
- **Cloud Firestore** - NoSQL database for app data
- **Firebase Storage** - Image and media storage
- **Firebase Analytics** - App usage analytics

### State Management & Context
- **React Context** - Global state management
- **Custom Hooks** - Reusable logic components

### UI/UX Libraries
- **Expo Vector Icons** - Icon library
- **Expo Linear Gradient** - Beautiful gradient effects
- **Expo Image** - Optimized image handling
- **Expo AV** - Audio/Video playback

### Internationalization
- **i18next** - Internationalization framework
- **react-i18next** - React bindings for i18n
- **expo-localization** - Device locale detection

### Development Tools
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking


### Development Options

In the terminal output, you'll find options to open the app in:

- **[d]** - Development build
- **[a]** - Android emulator
- **[i]** - iOS simulator  
- **[w]** - Web browser
- **[r]** - Reload the app
- **[m]** - Toggle menu

### Available Scripts

```bash
# Start development server
npm start

# Start with specific platform
npm run android      # Android emulator
npm run ios         # iOS simulator
npm run web         # Web browser

# Code quality
npm run lint        # Run ESLint

# Reset project (clean start)
npm run reset-project
```

## 🔧 Configuration

### Firebase Setup
1. Create collections in Firestore:
   - `foods` - Food items data
   - `ratings` - User ratings and reviews
   - `users` - User profiles
   - `favourites` - User favorite foods


## 📱 App Features in Detail

### Authentication Flow
- Secure login/registration with Firebase Auth
- Google Sign-In integration
- Password reset functionality
- Persistent authentication state

### Food Management
- Add new foods with images, descriptions, and restaurant locations
- Edit existing food entries (only by the creator)
- Delete foods with confirmation dialogs
- Image upload to Firebase Storage

### Rating System
- 5-star rating system for all foods
- Written reviews with character limits
- Average rating calculation
- Personal rating history

### User Experience
- Smooth navigation with Expo Router
- Loading states and error handling
- Offline capability for cached data
- Pull-to-refresh functionality

## 🎨 Design System

### Color Scheme
- **Light Theme**: Clean whites and soft grays
- **Dark Theme**: Deep blacks with accent colors
- **Brand Colors**: Sri Lankan-inspired color palette

### Typography
- **Primary Font**: System default
- **Secondary Font**: Space Mono (monospace)

### Components
- Consistent spacing and padding
- Rounded corners and shadows
- Responsive design principles
- Accessibility considerations

## 🌐 Internationalization

The app supports multiple languages:
- **English** (default)
- **Sinhala** (සිංහල)
- **Tamil** (தமிழ்)

Language files are located in the `i18n` directory and managed through React i18next.

## 📊 Data Models

### Food Model
```typescript
type Food = {
  id: string;
  name: string;
  region: string;
  categories: string[];
  rating: number;
  imageUrl: string;
  description: string;
  restaurants: Restaurant[];
  favouritesCount: number;
  userName: string;
  userId: string;
}
```

### Rating Model
```typescript
type Rating = {
  id: string;
  foodId: string;
  userId: string;
  rating: number;
  review: string;
  timestamp: Date;
}
```

## 🚀 Deployment

### Expo Application Services (EAS)
```bash
# Install EAS CLI
npm install -g eas-cli

# Configure EAS
eas build:configure

# Build for production
eas build --platform all

# Submit to app stores
eas submit
```

### Web Deployment
```bash
# Export for web
npx expo export -p web

# Deploy to Netlify/Vercel
# Upload the generated 'dist' folder
```

## 🧪 Testing

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Chinthana Chamod**
- GitHub: [@chinthanachamod](https://github.com/chinthanachamod)
- Email: chinthanachamod@gmail.com

## 🙏 Acknowledgments

- **Sri Lankan Culinary Heritage** - Inspiration for authentic recipes
- **Firebase** - Backend services and authentication
- **Expo Team** - Amazing development platform
- **React Native Community** - Extensive library ecosystem

## 📞 Support

For support, email chinthanachamod50@gmail.com or create an issue in the GitHub repository.

---

**Made with ❤️ for Sri Lankan food lovers everywhere! 🇱🇰**
