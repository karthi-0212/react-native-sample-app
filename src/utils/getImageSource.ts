// Function to get local image source
const getImageSource = (productId: number) => {
    const images: { [key: number]: any } = {
      2: require('../assets/images/image2.jpg'),
      6: require('../assets/images/image6.jpg'),
      8: require('../assets/images/image8.jpg'),
      9: require('../assets/images/image9.jpg'),
      12: require('../assets/images/image12.jpg'),
    };
    return images[productId] || require('../assets/images/image12.jpg');
  };

  export default getImageSource;