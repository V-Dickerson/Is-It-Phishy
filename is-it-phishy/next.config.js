module.exports = () => {
    const rewrites = () => {
      return [
        {
          source: "/api/:path*",
          destination: 'https://lambishere.pythonanywhere.com/api/:path*'
        },
      ];
    };
    return {
      rewrites,
    };
  };