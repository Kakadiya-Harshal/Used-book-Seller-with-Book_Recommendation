import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const submitHandler =   (e) => {

    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else if (transcript.trim()) {
      setKeyword(transcript)
      history.push(`/search/${transcript}`)
    } else {
      history.push('/')
    }

  }


  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const startListening = () => {
    SpeechRecognition.startListening();

  };
  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
        id='title'
        // value={transcript}
        value={keyword}
      ></Form.Control>
      <div>
        {/* <p>Microphone: {listening ? 'on' : 'off'}</p> */}
        <button onClick={startListening} ><i class="fa fa-microphone" aria-hidden="true"></i></button>
        <p>{transcript}</p>

      </div>
      <Button type='submit' variant='outline-success' className='p-2'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
