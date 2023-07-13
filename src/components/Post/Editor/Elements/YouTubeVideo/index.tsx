import YouTubeEmbed from 'react-youtube'

const YouTubeVideo = (props) => {
  const { attributes, children, element } = props
  const { youtubeId } = element

  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <YouTubeEmbed
          videoId={youtubeId}
        />
      </div>
      {children}
    </div>
  )
}

export default YouTubeVideo
