import React, {useState, useRef} from 'react';
import sjcl from 'sjcl';

import './App.scss';

function App() {
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [encryptionFinished, setEncryptionFinished] = useState(false);
  
  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    e.preventDefault();
    textAreaRef.current.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    e.target.focus();
    setCopySuccess('Copied!');
  };

  function handleEncrypt(e) {
    e.preventDefault();
    if (password !== '') {
      let enc = encrypt();
      setEncryptedText(enc);
      setText(enc);
      setEncryptionFinished(true);
    } else {
      alert('enter password first');
    }
  }
  function handleDecrypt(e) {
    e.preventDefault();
    if (password !== '' && text !== '') {
      let dec = decrypt();
      setText(dec);
    } else {
      alert('Please fill all fields');
    }
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
  const handleTextChange = (e) => {
    setText(e.target.value);
  } 
  const encrypt = () => {
    return sjcl.encrypt(password, text);
  }
  const decrypt = () => {
    return sjcl.decrypt(password, text);
  }

  return (
    <div className="App">
      <h1>Majabba</h1>
      <h4>Crypt your messages</h4>
      <form className="crypto-form">
        <input
          type="text"
          id="pass"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
        />
        
        <textarea 
          name="text"
          id="text"
          cols="30"
          rows="10"
          value={text}
          onChange={handleTextChange}
          ref={textAreaRef}
        />
        {
          /* Logical shortcut for only displaying the 
            button if the copy command exists */
          encryptionFinished &&
          <>
            <div className="btn-wrap">
              <button className="btn" onClick={copyToClipboard}>Copy text to clipboard</button> 
            </div>
            {copySuccess && <div className="copy">{copySuccess}</div>}
          </>
        }
        <div className="btn-wrap">
          <button type="submit" className="btn" onClick={handleEncrypt}>Encrypt</button>
          <button type="submit" className="btn" onClick={handleDecrypt}>Decrypt</button>
        </div>
      </form>
    </div>
  );
}

export default App;
