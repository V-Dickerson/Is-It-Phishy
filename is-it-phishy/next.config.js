module.exports = () => {
    const rewrites = () => {
      return [
        {
          source: "/api/:path*",
          destination: 
          process.env.NODE_ENV === 'development'
          ? "http://localhost:5000/api/:path*"
          : 'https://lambishere.pythonanywhere.com/api/:path*'
        },
      ];
    };
    return {
      rewrites,
    };
  };