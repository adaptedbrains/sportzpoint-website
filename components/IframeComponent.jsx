const IframeComponent = ({ content }) => {
  return (
    <iframe
      className="post-description text-lg text-gray-800 overflow-hidden"
      style={{ width: '100%', height: '500px', border: 'none' }}
      srcDoc={content}
    />
  );
};

export default IframeComponent;
