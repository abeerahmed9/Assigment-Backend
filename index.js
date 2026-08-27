// 1. Express ko apne project mein bula rahe hain (Jaise manager ko hire karna)
const express = require('express'); 

// 2. Express ko start kar diya, ab yeh 'app' humara manager hai jo sab control karega
const app = express(); 

// 3. Port set karna. (Port aapki dukaan ka address ya number hai, yahan hum 3000 rakh rahe hain)
const PORT = 3000; 

// 4. JSON data samajhne ke liye translator!
// Real-life example: Agar customer English mein order de aur waiter ko sirf Urdu aati ho toh masla hoga. Yeh line Waiter ko batati hai ke customer jo data bhejega wo JSON format mein hoga, usko samajh lena.
app.use(express.json());

// Yeh humara temporary database (register) hai
let students = [
  { id: 1, name: "Ali", age: 15 },
  { id: 2, name: "Ahmed", age: 16 }
];
// Jab koi "/students" wale raste par aayega data lene (GET karne)...
app.get('/students', (req, res) => {
  // req (Request): Customer ne kya manga hai.
  // res (Response): Hum usko kya wapas denge.
  
  // Hum status 200 (Yani sab theek hai 'OK') aur students ki poori list wapas bhej rahe hain.
  res.status(200).send(students); 
});

// Jab koi naya data daalne (POST) aayega...
app.post('/students', (req, res) => {
  // req.body ka matlab hai customer ne form mein jo details likh kar bheji hain
  const nayaStudent = req.body; 
  
  // push() array mein nayi cheez add karta hai, jaise register ke end mein naya naam likhna
  students.push(nayaStudent); 
  
  // Status 201 ka matlab hota hai 'Nayi cheez kamiyabi se ban gayi'
  res.status(201).send({ message: "Naya student add ho gaya mubarak ho!", data: nayaStudent });
});

// URL mein ':id' ka matlab hai ke ID badal sakti hai (jaise /students/1 ya /students/2)
app.put('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id); // URL se student ka roll number (id) nikala
  const updateWalaData = req.body; // Jo naya naam ya umar bheji gayi hai
  
  // Find index humein batata hai ke array mein yeh student kis line par khada hai
  const index = students.findIndex(student => student.id === studentId);
  
  if (index === -1) {
    // -1 ka matlab hai student nahi mila! (Jaise roll number 100 register mein hai hi nahi)
    return res.status(404).send({ message: "Bhai yeh student toh hai hi nahi!" });
  }
  
  // Agar mil gaya toh uski purani details ki jagah nayi details daal do
  // Yeh ... (spread operator) purane data aur naye data ko mila deta hai
  students[index] = { ...students[index], ...updateWalaData };
  
  res.status(200).send({ message: "Student ka data update ho gaya!", data: students[index] });
});

app.delete('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id); // Kis ko nikalna hai uski ID nikali
  
  // Filter ka matlab hai: "Jis bachay ki ID match ho gayi, usko bahar nikal do, baqi sab ko filter karke wapas list mein daal lo"
  students = students.filter(student => student.id !== studentId);
  
  res.status(200).send({ message: `ID ${studentId} wala student delete ho gaya hai system se!` });
});

// 5. Dukaan kholne (Server start karne) ka code
app.listen(PORT, () => {
  console.log(`Zabardast! Server port 3000 par chal raha hai!`);
});