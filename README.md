# 3D Galaxy Visualization

An immersive 3D visualization of galaxies and their planetary systems built with React, Three.js, and React Three Fiber. This project creates an interactive space environment where users can explore different galaxies and their unique planetary systems representing complex spiritual or personal growth topics visually rather than reading long lists.

![Galaxy Visualization Demo](public/demo.gif)

## ✨ Features

- **Interactive 3D Galaxies**
  - Multiple unique galaxies with distinct colors and characteristics
  - Smooth animations and transitions
  - Dynamic camera movements

- **Detailed Planetary Systems**
  - Orbiting planets with unique properties
  - Interactive planet labels with detailed information
  - Dynamic scaling and positioning

- **Ambient Space Effects**
  - Background meteor effects
  - Dynamic lighting
  - Smooth transitions and animations

- **Responsive Design**
  - Adapts to different screen sizes
  - Touch and mouse interaction support
  - Optimal performance across devices

## 🚀 Technologies Used

- **React** - Frontend framework
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **GSAP** - Animation library
- **Vite** - Build tool and development server

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd galaxies
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🎮 Usage

- **Navigate**: Click and drag to rotate the view
- **Zoom**: Use mouse wheel or pinch gestures
- **Select Galaxy**: Click on a galaxy to focus
- **Explore Planets**: Hover over planets to see details
- **Reset View**: Double-click empty space to reset camera

## 🛠️ Project Structure

```
galaxies/
├── src/
│   ├── components/
│   │   ├── Galaxy.jsx        # Galaxy component with core and rings
│   │   ├── Planet.jsx        # Individual planet with orbit and label
│   │   └── SpaceEffects.jsx  # Background effects (meteors)
│   ├── data/
│   │   └── galaxiesData.js   # Galaxy and planet configuration
│   ├── App.jsx              # Main application component
│   └── main.jsx            # Entry point
├── public/                 # Static assets
└── package.json           # Dependencies and scripts
```

## ⚙️ Configuration

Customize galaxy and planet properties in `src/data/galaxiesData.js`:

```javascript
{
  name: "Galaxy Name",
  color: "#hexcolor",
  planets: [
    {
      name: "Planet Name",
      size: 2,
      orbitRadius: 15,
      rotationSpeed: 0.5
    }
    // ... more planets
  ]
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Three.js for the amazing 3D graphics capabilities
- React Three Fiber team for the React integration
- GSAP for smooth animations
- Contributors and maintainers

---

Made with ❤️ by [Hifzur Rahman]
 Loom demo link and PR explanation -   https://www.loom.com/share/c41d8add5ecd4553a1758322e98a942f
