
export default function AvatarGenerator() {
  // Generate the URL for a random default avatar
  // For example, you could have a set of default avatars and randomly select one.
  const defaultAvatars = [
    "https://i.imgur.com/yY0ve4r.png",
    "https://i.imgur.com/02KSrZi.png",
    "https://i.imgur.com/NYVDUcJ.png",
    "https://i.imgur.com/umoZt9m.png",
    "https://i.imgur.com/ku6ZIYJ.png",
    "https://i.imgur.com/e4zK5ld.png",
  ];

  const randomIndex = Math.floor(Math.random() * defaultAvatars.length);
  return defaultAvatars[randomIndex];
}
