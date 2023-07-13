const ImageEmbed = props => (
  <img {...props.attributes} src={props.element.url} alt="img" />
)

export default ImageEmbed
