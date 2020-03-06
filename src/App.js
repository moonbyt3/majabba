import React, {useState} from 'react';
import xxtea from 'xxtea';

import './App.css';

function App() {
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const [encryptedText, setEncryptedText] = useState('');

  function handleEncrypt(e) {
    e.preventDefault();
    if (password !== '') {
      let enc = encrypt();
      setEncryptedText(enc);
      setText(enc);
    } else {
      alert('enter password first');
    }
  }
  function handleDecrypt(e) {
    e.preventDefault();
    if (password !== '') {
      let dec = decrypt();
      setText(dec);
    } else {
      alert('enter password first');
    }
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
  const handleTextChange = (e) => {
    setText(e.target.value);
  } 
  const encrypt = () => {
    return xxtea.encrypt(text, password);
  }

  const decrypt = () => {
    return xxtea.decrypt(text, password);
  }
  
  return (
    <div className="App">
      <form >
        <label htmlFor="pass">
          <input type="text" id="pass" value={password} onChange={handlePasswordChange}/>
        </label>
        <br/>
        <textarea 
          name="text"
          id="text"
          cols="30"
          rows="10"
          value={text}
          onChange={handleTextChange}
        />
        <br/>
        <button type="submit" onClick={handleEncrypt}>Encrypt</button>
        <button type="submit" onClick={handleDecrypt}>Decrypt</button>
      </form>
    </div>
  );
}

export default App;
