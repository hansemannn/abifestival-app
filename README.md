# Abifestival-App

[![Contact](http://hans-knoechel.de/shields/shield-twitter.svg)](http://twitter.com/hansemannnn)

The Abifestival App is a cross-platform Titanium app made for the music-festival "Abifestival" organized 
by high-school graduates in Germany. The app was initially build in 2012 as a classic Titanium project
and has recently been rewritten to Alloy. It is open source to share the concepts behind making a Titanium 
application and it includes native features like remote push-notifications with PushWoosh and a 
completely native user-experience.

<img alt="App Store" src="https://abload.de/img/affvxub.png" width="900" />

### Features (Selection)

- [x] Cross-Platform native App
- [x] Advanced List Views
- [x] Remote Push Notifications
- [x] Segmental Control Flow
- [x] REST-API Handling
- [x] Launch-Screen Storyboards (iOS)
- [x] 9-Patch Launch-Screen (Android)
- [x] Local Persistence / Favorites

### Used Titanum API's (Selection)

#### Core API's
`Ti.App.iOS.ApplicationShortcuts`,  `Ti.Filesystem`, `Ti.UI.iOS.TabbedBar`, `Ti.UI.ListView`, 
`Ti.UI.RefreshControl`, `Ti.Network`, `Ti.UI.TabGroup`, ...

#### Modules
- [x] [Ti.Pushwoosh](https://github.com/Pushwoosh/pushwoosh-appcelerator-titanium)

### Running the App

#### Via Appcelerator Studio

1. Import it via *Dashboard* if available.
2. Or import it via *File > Import... > Git > Git Repository as New Project* with *URI*:

		https://github.com/hansemannn/abifestival-app

3. Select a Simulator or Device to build to via *Run > Run As*.

#### Via CLI

1. Clone the repository:

		git clone https://github.com/hansemannn/abifestival-app

2. To run it with `appc run` first import it to the platform:

		appc new --import --no-services

3. Build to Simulator or Device:

		[appc run | ti build] -p ios [-T device]

### Author

Hans Knöchel ([@hansemannnn](https://twitter.com/hansemannnn) / [Web](http://hans-knoechel.de))

### License 

MIT

### Contribution

Code contributions are greatly appreciated, please submit a new [pull request](https://github.com/hansemannn/abifestival-app/pull/new/master)!
