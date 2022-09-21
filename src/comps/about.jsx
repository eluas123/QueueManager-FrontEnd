import Footer from './footer';
import React from 'react'
import HeaderClient from './headerClient'


export default function About(props) {


  return (
    <React.Fragment>
      <HeaderClient />
      <div className='container-fluid about'> 
      <div className='container'>
       <h1 className='text-center display-4 mt-5'>אודות המספרה</h1>
       <div className='d-flex justify-content-center'>
       <div className='col-md-6 text-center border p-5'>
        <p>מספרת טימור רבני היא מספרה בתל אביב שבה עיצוב שיער משלב ניסיון של 30 שנה עם יצירתיות, סגנון, חדשנות, סטייל ואמנות. המספרה משרתת נאמנה אין ספור לקוחות המגיעים אלינו גם מהסביבה וגם ממרחק. ביניהם לא מעט שחקניות, דוגמניות וידועניות. עם צוות ספרים שהשתלם בבתי הספר המובילים בלונדון, ובראשם אילן ששון שהתפרסם בזכות עיצובי שיער ייחודיים ומדהימים, אתם יכולים להיות בטוחים שהשיער שלכם יקבל את היחס הטוב ביותר. הכל בהתאמה אישית, ללא פשרות ועם החומרים הטובים בעולם
 </p>
       </div>
       </div>
      </div>
      </div>
      <Footer/>
    </React.Fragment>
  )
}
