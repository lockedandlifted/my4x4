interface TransmissionProps {
  fillColor: string,
  height: string,
  width: string,
}

const Transmission = (props: TransmissionProps) => {
  const { fillColor = '#4B4D57', height = '32', width = '32' } = props

  return (
    <svg width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M5.33268 3C3.30868 3 1.66602 4.64267 1.66602 6.66667C1.66602 8.69067 3.30868 10.3333 5.33268 10.3333C7.35668 10.3333 8.99935 8.69067 8.99935 6.66667C8.99935 4.64267 7.35668 3 5.33268 3ZM5.33268 5C6.25268 5 6.99935 5.74667 6.99935 6.66667C6.99935 7.58667 6.25268 8.33333 5.33268 8.33333C4.41268 8.33333 3.66602 7.58667 3.66602 6.66667C3.66602 5.74667 4.41268 5 5.33268 5Z" fill={fillColor} />
      <path fillRule="evenodd" clipRule="evenodd" d="M5.33268 21.6666C3.30868 21.6666 1.66602 23.3093 1.66602 25.3333C1.66602 27.3573 3.30868 29 5.33268 29C7.35668 29 8.99935 27.3573 8.99935 25.3333C8.99935 23.3093 7.35668 21.6666 5.33268 21.6666ZM5.33268 23.6666C6.25268 23.6666 6.99935 24.4133 6.99935 25.3333C6.99935 26.2533 6.25268 27 5.33268 27C4.41268 27 3.66602 26.2533 3.66602 25.3333C3.66602 24.4133 4.41268 23.6666 5.33268 23.6666Z" fill={fillColor} />
      <path fillRule="evenodd" clipRule="evenodd" d="M15.9987 3C13.9747 3 12.332 4.64267 12.332 6.66667C12.332 8.69067 13.9747 10.3333 15.9987 10.3333C18.0227 10.3333 19.6654 8.69067 19.6654 6.66667C19.6654 4.64267 18.0227 3 15.9987 3ZM15.9987 5C16.9187 5 17.6654 5.74667 17.6654 6.66667C17.6654 7.58667 16.9187 8.33333 15.9987 8.33333C15.0787 8.33333 14.332 7.58667 14.332 6.66667C14.332 5.74667 15.0787 5 15.9987 5Z" fill={fillColor} />
      <path fillRule="evenodd" clipRule="evenodd" d="M15.9987 21.6666C13.9747 21.6666 12.332 23.3093 12.332 25.3333C12.332 27.3573 13.9747 29 15.9987 29C18.0227 29 19.6654 27.3573 19.6654 25.3333C19.6654 23.3093 18.0227 21.6666 15.9987 21.6666ZM15.9987 23.6666C16.9187 23.6666 17.6654 24.4133 17.6654 25.3333C17.6654 26.2533 16.9187 27 15.9987 27C15.0787 27 14.332 26.2533 14.332 25.3333C14.332 24.4133 15.0787 23.6666 15.9987 23.6666Z" fill={fillColor} />
      <path fillRule="evenodd" clipRule="evenodd" d="M26.6667 3C24.6427 3 23 4.64267 23 6.66667C23 8.69067 24.6427 10.3333 26.6667 10.3333C28.6907 10.3333 30.3333 8.69067 30.3333 6.66667C30.3333 4.64267 28.6907 3 26.6667 3ZM26.6667 5C27.5867 5 28.3333 5.74667 28.3333 6.66667C28.3333 7.58667 27.5867 8.33333 26.6667 8.33333C25.7467 8.33333 25 7.58667 25 6.66667C25 5.74667 25.7467 5 26.6667 5Z" fill={fillColor} />
      <path fillRule="evenodd" clipRule="evenodd" d="M26.6667 21.6666C24.6427 21.6666 23 23.3093 23 25.3333C23 27.3573 24.6427 29 26.6667 29C28.6907 29 30.3333 27.3573 30.3333 25.3333C30.3333 23.3093 28.6907 21.6666 26.6667 21.6666ZM26.6667 23.6666C27.5867 23.6666 28.3333 24.4133 28.3333 25.3333C28.3333 26.2533 27.5867 27 26.6667 27C25.7467 27 25 26.2533 25 25.3333C25 24.4133 25.7467 23.6666 26.6667 23.6666Z" fill={fillColor} />
      <path fillRule="evenodd" clipRule="evenodd" d="M4.33203 9.33337V22.6667C4.33203 23.2187 4.78003 23.6667 5.33203 23.6667C5.88403 23.6667 6.33203 23.2187 6.33203 22.6667V9.33337C6.33203 8.78137 5.88403 8.33337 5.33203 8.33337C4.78003 8.33337 4.33203 8.78137 4.33203 9.33337Z" fill={fillColor} />
      <path fillRule="evenodd" clipRule="evenodd" d="M15 9.33337V22.6667C15 23.2187 15.448 23.6667 16 23.6667C16.552 23.6667 17 23.2187 17 22.6667V9.33337C17 8.78137 16.552 8.33337 16 8.33337C15.448 8.33337 15 8.78137 15 9.33337Z" fill={fillColor} />
      <path fillRule="evenodd" clipRule="evenodd" d="M25.6654 9.33337V14.6667C25.6654 14.8507 25.516 15 25.332 15H5.33203C4.78003 15 4.33203 15.448 4.33203 16C4.33203 16.552 4.78003 17 5.33203 17H25.332C26.6214 17 27.6654 15.9547 27.6654 14.6667C27.6654 12.7214 27.6654 9.33337 27.6654 9.33337C27.6654 8.78137 27.2174 8.33337 26.6654 8.33337C26.1134 8.33337 25.6654 8.78137 25.6654 9.33337Z" fill={fillColor} />
    </svg>
  )
}

export default Transmission
