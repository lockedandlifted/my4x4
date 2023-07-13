const Leaf = props => (
  <span
    {...props.attributes}
    style={{
      fontWeight: props.leaf.bold ? 'bold' : 'normal',
      fontStyle: props.leaf.italic ? 'italic' : 'normal',
      textDecoration: props.leaf.underline ? 'underline' : 'none',
    }}
  >
    {props.children}
  </span>
)

export default Leaf
