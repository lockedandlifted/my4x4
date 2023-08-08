interface ElectronicsProps {
  fillColor: string,
  height: string,
  width: string,
}

const Electronics = (props: ElectronicsProps) => {
  const { fillColor = '#4B4D57', height = '32', width = '32' } = props

  return (
    <svg width={width} height={height} viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M21.3585 7.85005C21.4712 8.66011 21.7456 9.42575 22.1713 10.0644C22.7359 10.9112 23.7025 11.7 25 11.7C26.2975 11.7 27.2641 10.9112 27.8287 10.0644C28.4012 9.20565 28.7 8.11729 28.7 7.00005C28.7 5.88281 28.4012 4.79445 27.8287 3.93574C27.2641 3.08891 26.2975 2.30005 25 2.30005C23.7025 2.30005 22.7359 3.08891 22.1713 3.93574C21.7456 4.57435 21.4712 5.33998 21.3585 6.15005H18V7.85005H21.3585ZM25 10C26.1046 10 27 8.6569 27 7.00005C27 5.34319 26.1046 4.00005 25 4.00005C23.8954 4.00005 23 5.34319 23 7.00005C23 8.6569 23.8954 10 25 10Z" fill={fillColor} />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M27.8295 22.0644C27.2649 22.9112 26.2983 23.7 25.0008 23.7C23.7032 23.7 22.7366 22.9112 22.1721 22.0644C21.5996 21.2057 21.3008 20.1173 21.3008 19C21.3008 17.8828 21.5996 16.7944 22.1721 15.9357C22.7366 15.0889 23.7032 14.3 25.0008 14.3C26.2983 14.3 27.2649 15.0889 27.8295 15.9357C28.402 16.7944 28.7008 17.8828 28.7008 19C28.7008 20.1173 28.402 21.2057 27.8295 22.0644ZM25.0008 22C26.1054 22 27.0008 20.6569 27.0008 19C27.0008 17.3432 26.1054 16 25.0008 16C23.8962 16 23.0008 17.3432 23.0008 19C23.0008 20.6569 23.8962 22 25.0008 22Z" fill={fillColor} />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M6.95839 1.96539C6.58529 1.91862 6.29328 2.05033 6.14273 2.25316C4.82039 4.03467 2.85039 8.11187 2.85039 14.2206V27.6512C2.85039 28.192 3.2277 28.6591 3.75875 28.7732L12.486 30.6489C13.1877 30.7997 13.8777 30.2473 13.8777 29.5V15.1324C13.8777 12.8379 14.1889 8.00065 15.3551 4.24559C15.5551 3.60145 15.1263 2.98939 14.6219 2.92615L6.95839 1.96539ZM14.7807 1.23275L7.16986 0.278596C6.31562 0.171502 5.36435 0.449537 4.77767 1.23994C3.2345 3.31896 1.15039 7.75255 1.15039 14.2206V27.6512C1.15039 28.9956 2.08945 30.1533 3.40155 30.4353L12.1288 32.3109C13.6233 32.6321 15.0277 31.7114 15.4496 30.35H16.0004C17.5744 30.35 18.8504 29.074 18.8504 27.5V4.08275C18.8504 2.50874 17.5744 1.23275 16.0004 1.23275H14.7807ZM17.1504 14.2824H16.5004C16.0309 14.2824 15.6504 14.6629 15.6504 15.1324C15.6504 15.6018 16.0309 15.9824 16.5004 15.9824H17.1504V27.5C17.1504 28.1352 16.6355 28.65 16.0004 28.65H15.5777V15.1324C15.5777 12.9129 15.8854 8.26996 16.9786 4.74978C17.0826 4.41476 17.1184 4.06416 17.0918 3.71941C17.1298 3.83362 17.1504 3.95578 17.1504 4.08275V14.2824ZM7.59214 7.56745C7.02466 7.48162 6.5363 7.80313 6.40329 8.27097C6.12384 9.25381 5.83913 10.4748 5.68785 11.6854C5.62964 12.1512 5.9745 12.6288 6.56464 12.7134L9.16815 13.0864C9.80417 13.1775 10.426 12.7219 10.5352 12.0413C10.6587 11.2712 10.8146 10.4084 11.0002 9.55567C11.1723 8.76473 10.639 8.00438 9.9222 7.90495C9.04562 7.78335 8.25268 7.66736 7.59214 7.56745ZM4.76809 7.80605C5.15868 6.4323 6.52082 5.68607 7.84638 5.88657C8.50056 5.98551 9.2866 6.1005 10.1558 6.22107C11.9372 6.46819 13.0255 8.24367 12.6613 9.91719C12.4839 10.7324 12.3336 11.5635 12.2137 12.3106C11.965 13.8607 10.5274 14.9985 8.92704 14.7692L6.32354 14.3962C4.94382 14.1985 3.81242 12.9834 4.00097 11.4746C4.16606 10.1535 4.4729 8.84429 4.76809 7.80605ZM8.70655 8.17541C9.16197 8.28927 9.43887 8.75076 9.32501 9.20619L8.82501 11.2062C8.71116 11.6616 8.24966 11.9385 7.79424 11.8247C7.33881 11.7108 7.06191 11.2493 7.17577 10.7939L7.67577 8.79388C7.78963 8.33845 8.25112 8.06156 8.70655 8.17541ZM3.87766 19.1312C3.87766 17.9004 4.96798 16.9552 6.18628 17.1298L10.2062 17.7057C11.2019 17.8484 11.9413 18.7013 11.9413 19.7071C11.9413 20.9379 10.851 21.8831 9.63269 21.7086L5.61276 21.1326C4.61707 20.9899 3.87766 20.137 3.87766 19.1312ZM10.2413 19.7071C10.2413 19.547 10.1236 19.4112 9.96509 19.3885L5.94517 18.8126C5.75123 18.7848 5.57766 18.9353 5.57766 19.1312C5.57766 19.2913 5.69537 19.4271 5.85387 19.4498L9.8738 20.0257C10.0677 20.0535 10.2413 19.9031 10.2413 19.7071ZM3.81857 21.5765C4.28801 21.5765 4.66857 21.9571 4.66857 22.4265V23.7942C4.66857 24.0745 4.53285 24.3231 4.32353 24.478C4.53285 24.6328 4.66857 24.8814 4.66857 25.1618V26.5294C4.66857 26.9989 4.28801 27.3794 3.81857 27.3794C3.34913 27.3794 2.96857 26.9989 2.96857 26.5294V25.1618C2.96857 24.8814 3.1043 24.6328 3.31362 24.478C3.1043 24.3231 2.96857 24.0745 2.96857 23.7942V22.4265C2.96857 21.9571 3.34913 21.5765 3.81857 21.5765ZM6.54585 22.0324C7.01529 22.0324 7.39584 22.4129 7.39584 22.8824V24.25C7.39584 24.7195 7.01529 25.1 6.54585 25.1C6.0764 25.1 5.69585 24.7195 5.69585 24.25V22.8824C5.69585 22.4129 6.0764 22.0324 6.54585 22.0324ZM9.27312 22.4883C9.74256 22.4883 10.1231 22.8688 10.1231 23.3383V24.7059C10.1231 25.1754 9.74256 25.5559 9.27312 25.5559C8.80368 25.5559 8.42312 25.1754 8.42312 24.7059V23.3383C8.42312 22.8688 8.80368 22.4883 9.27312 22.4883ZM12.0004 22.9442C12.4698 22.9442 12.8504 23.3247 12.8504 23.7942V25.1618C12.8504 25.6312 12.4698 26.0118 12.0004 26.0118C11.5309 26.0118 11.1504 25.6312 11.1504 25.1618V23.7942C11.1504 23.3247 11.5309 22.9442 12.0004 22.9442ZM6.54585 25.2236C7.01529 25.2236 7.39584 25.6041 7.39584 26.0736V27.4412C7.39584 27.9107 7.01529 28.2912 6.54585 28.2912C6.0764 28.2912 5.69585 27.9107 5.69585 27.4412V26.0736C5.69585 25.6041 6.0764 25.2236 6.54585 25.2236ZM9.27312 25.6794C9.74256 25.6794 10.1231 26.06 10.1231 26.5294V27.8971C10.1231 28.3665 9.74256 28.7471 9.27312 28.7471C8.80368 28.7471 8.42312 28.3665 8.42312 27.8971V26.5294C8.42312 26.06 8.80368 25.6794 9.27312 25.6794ZM12.0004 26.1353C12.4698 26.1353 12.8504 26.5159 12.8504 26.9853V28.353C12.8504 28.8224 12.4698 29.203 12.0004 29.203C11.5309 29.203 11.1504 28.8224 11.1504 28.353V26.9853C11.1504 26.5159 11.5309 26.1353 12.0004 26.1353Z" fill={fillColor} />
    </svg>
  )
}

export default Electronics
