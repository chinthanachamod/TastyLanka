# 🍛 TastyLanka - Sri Lankan Food Discovery App

## 📖 Overview

TastyLanka is a comprehensive cross-platform mobile application designed to discover, explore, and share traditional Sri Lankan cuisine. Built with modern React Native and Firebase technologies, this app serves as a digital gateway to authentic Sri Lankan dishes from across the island's diverse regions, connecting food enthusiasts with the rich culinary heritage of Sri Lanka.

### 🎯 Project Purpose
This application was developed as a capstone project for Advanced Mobile Application Development, demonstrating proficiency in modern mobile development practices, cloud integration, and user experience design while celebrating Sri Lankan cultural heritage through technology.

## 🔗 Quick Links
- 🎥 Youtube Link : [https://youtu.be/r_z9hVSRIik]
- 📱 App Link : [https://expo.dev/artifacts/eas/hSKbTErAjiVNGHspXvqh4o.apk]

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

### Core Technologies
| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Framework** | React Native | 0.81.4 | Cross-platform mobile development |
| **Platform** | Expo | 54.0.10 | Development toolchain and deployment |
| **Language** | TypeScript | 5.3.3 | Type-safe development |
| **Backend** | Firebase | 12.2.1 | Authentication, database, and storage |

### Frontend Technologies
- **Navigation**: Expo Router (File-based routing)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Animations**: React Native Reanimated 4.1.1
- **State Management**: React Context API with custom hooks
- **Icons**: Expo Vector Icons
- **Media**: Expo Image, Expo AV

### Backend Services
- **Authentication**: Firebase Auth (Email/Password, Google Sign-In)
- **Database**: Cloud Firestore (Real-time NoSQL database)
- **Storage**: Firebase Storage (Image and media files)
- **Analytics**: Firebase Analytics (User engagement tracking)

### Development & Quality Tools
- **Code Quality**: ESLint, Prettier
- **Type Checking**: TypeScript compiler
- **Internationalization**: i18next, react-i18next
- **Localization**: expo-localization

## 🚀 Getting Started

### Running the App

Choose your preferred platform:
- **Android**: Press `a` in terminal or run `npm run android`
- **iOS**: Press `i` in terminal or run `npm run ios`
- **Web**: Press `w` in terminal or run `npm run web`

## 🔧 Configuration Files

### Environment Setup
Create necessary environment configuration in your Firebase project:
- Enable Authentication providers (Email/Password, Google)
- Configure Firestore security rules
- Set up Firebase Storage rules
- Enable Analytics (optional)


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



## 🧪 Testing & Quality Assurance

### Testing Checklist
- [ ] Authentication flows (Login/Register/Logout)
- [ ] CRUD operations (Foods, Ratings, Favorites)
- [ ] Navigation between screens
- [ ] Theme switching (Dark/Light)
- [ ] Language switching
- [ ] Image upload functionality
- [ ] Offline behavior
- [ ] Error handling


## 🤝 Contributing

### Commit Convention
We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation updates
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### Code Style Guidelines
- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Write meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused

## 📈 Performance Considerations

- **Image Optimization**: Uses Expo Image for optimized image loading
- **Lazy Loading**: Implements lazy loading for large lists
- **Caching**: Leverages Firebase offline persistence
- **Bundle Size**: Optimized with tree-shaking and code splitting
- **Memory Management**: Proper cleanup of listeners and subscriptions

## 🔒 Security Features

- **Authentication**: Secure Firebase Auth integration
- **Data Validation**: Input validation on both client and server
- **Privacy**: User data protection and GDPR compliance
- **Secure Storage**: Sensitive data stored securely
- **API Security**: Firestore security rules implementation

## 🌍 Internationalization

The app supports multiple languages with dynamic switching:

| Language | Code | Status |
|----------|------|--------|
| English | `en` | ✅ Complete |
| Sinhala | `si` | ✅ Complete |
| Tamil | `ta` | 🚧 In Progress |

### Adding New Languages
1. Create translation files in `i18n/locales/`
2. Update language configuration
3. Test with different device locales

## 📱 Platform Support

| Platform | Status | Notes |
|----------|--------|-------|
| **Android** | ✅ Supported | API Level 21+ |
| **iOS** | ✅ Supported | iOS 13+ |
| **Web** | ✅ Supported | Modern browsers |

## 🎯 Future Roadmap

### Planned Features
- [ ] **Social Features**: User following and food sharing
- [ ] **Advanced Search**: AI-powered food recommendations
- [ ] **Offline Mode**: Complete offline functionality
- [ ] **Push Notifications**: Food updates and reminders
- [ ] **Map Integration**: Restaurant locations and directions
- [ ] **Recipe Sharing**: Detailed cooking instructions
- [ ] **Community Forums**: Food discussion boards

### Technical Improvements
- [ ] **Performance**: Implement React Query for data caching
- [ ] **Testing**: Add comprehensive unit and integration tests
- [ ] **CI/CD**: GitHub Actions workflow setup
- [ ] **Monitoring**: Error tracking and analytics
- [ ] **Accessibility**: Enhanced accessibility features

## 📞 Support & Contact

### Contact Information
- **Developer**: Chinthana Chamod
- **Email**: chinthanachamod50@gmail.com
- **GitHub**: [chinthanachamod](https://github.com/chinthanachamod/TastyLanka)
- **LinkedIn**: [Chinthana Chamod](www.linkedin.com/in/chinthana-chamod-2a133b323)

### Response Times
- **Bug Reports**: 24-48 hours
- **Feature Requests**: 1-2 weeks
- **General Questions**: 12-24 hours

## 🙏 Acknowledgments

### Special Thanks
- **Sri Lankan Culinary Heritage** - For the rich cultural inspiration
- **Firebase Team** - For the robust backend infrastructure
- **Expo Team** - For the excellent development platform
- **React Native Community** - For the extensive ecosystem
- **Open Source Contributors** - For the amazing libraries used

### Cultural Appreciation
This app is built with deep respect for Sri Lankan culture and cuisine. We acknowledge the traditional knowledge and recipes that make this app meaningful.

## 📊 Project Statistics

---

<div align="center">

**🍛 Made with ❤️ for Sri Lankan food lovers everywhere! 🇱🇰**

*Preserving culture through technology, one dish at a time.*

[⭐ Star this repo](https://github.com/chinthanachamod/TastyLanka/stargazers) | [🐛 Report Bug](https://github.com/chinthanachamod/TastyLanka/issues) | [✨ Request Feature](https://github.com/chinthanachamod/TastyLanka/issues)

</div>
