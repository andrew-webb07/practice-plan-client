# Practice-Plan: Practice schedule organizer for musicians and athletes

## Description

Practice-Plan is designed to help musicians and athletes organize their practice exercises, practice plans and scheduled practice sessions in a user-friendly and efficient app.

The user is able to make a public or private profile. The public profile allows other users to use the public user's exercises, plans and categories on their own plans and sessions.

The user can create any number of categories to help organize their exercises. The user then has the ability to create exercsies that store the category, title, description and example picture of the exercise. They can choose from their categories or any other public user's categories. They can make a practice plan that contains a title, description and exercise(s). Lastly, the user can schedule a session using any of the practice plans created by them or other public user's. The session will have a practice plan, length of session, date and notes for the session.

The user can edit and delete any session, plan, exercise or category they created, but they can not delete or edit other public user's data.

### Additional Features

The app has buttons on the landing page that take the user to each of the 3 forms. The app has a number of modals to help a user decide which exercises to pick on practice plan or which practice plan to put on a session. There are modals that help show the relationships between the different data types, like the exercise detail modal shows which practice plans contain that particular exercise.

There are also search bars on the practice plan form to look through all of the exercises available and on the exercise list page to search by title or description. There is also a category dropdown bar on the plan form and exercise list to continue to filter exercises. The plan, exercise and category lists have a checkbox that filters the data to display only the current user's data. 

### Technologies Used

![HTML5](https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Git](https://img.shields.io/badge/git%20-%23F05033.svg?&style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github%20-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white) ![Visual Studio Code](https://img.shields.io/badge/VSCode%20-%23007ACC.svg?&style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Python](https://img.shields.io/badge/Python%20-%23007ACC.svg?&style=for-the-badge&logo=Python&logoColor=white)
![Django](https://img.shields.io/badge/Django%20-%23007ACC.svg?&style=for-the-badge&logo=Django&logoColor=white)

## Wireframe

![Wireframe-Practice-Plan](https://user-images.githubusercontent.com/81766179/134361483-4bd16864-864f-4d43-836e-febfe18ba410.png)

## ERD

![ERD-Practice-Plan](https://user-images.githubusercontent.com/81766179/134361896-82e7b4e7-2128-4002-aa53-a33e940304c2.png)

## Images of Practice-Plan

![Login-Practice-Plan](https://user-images.githubusercontent.com/81766179/134362034-6e78753b-c5fc-4e33-b306-b239ac0e0a71.png)

![Register-Practice-Plan](https://user-images.githubusercontent.com/81766179/134364198-6576cd3d-766c-4ae9-a157-1281bf7537f6.png)

![Landing-Page-Practice-Plan](https://user-images.githubusercontent.com/81766179/134364290-eacba670-4381-4d75-8c70-0babafd0d208.png)

![Session-Form](https://user-images.githubusercontent.com/81766179/134364938-2bbc609a-1c82-460a-b614-270954e54e50.png)

![Practice-Plan-List](https://user-images.githubusercontent.com/81766179/134364435-93f50675-5548-46cd-925e-51cd8e05db48.png)

![Practice-Plan-Form](https://user-images.githubusercontent.com/81766179/134364578-b03af52e-aa55-4cd3-80aa-97132b425a57.png)

![Practice-Plan-Detail](https://user-images.githubusercontent.com/81766179/134365180-06051f82-e414-421a-b883-9a7f7ec7b3c0.png)

![Exercise-List](https://user-images.githubusercontent.com/81766179/134365606-26d17e45-b00a-410e-8c23-df4852e91b5a.png)

![Exercise-Form](https://user-images.githubusercontent.com/81766179/134365715-1baf126f-b9fc-463c-b1a1-a746ff07c0f6.png)

![Exercise-Detail](https://user-images.githubusercontent.com/81766179/134366296-316a431a-9c27-4c75-a4af-dff280734f7f.png)

![Category-List](https://user-images.githubusercontent.com/81766179/134366384-78c200a5-07eb-4412-862e-d1478c586c54.png)

<!-- ## DEMO Video

<a href="https://www.loom.com/share/547d9764f1394fcca63b241434fd9ea3" target="_blank" alt="demo video">Demo Video of Practice-Plan</a> -->

## Running This Application

### Installation

<div>Along with this repository, you will need to clone the Practice Plan Server repo as well which contains the data.</div>

<ol>
    <li>Clone this repository and change to the directory in the terminal.</li>
</ol>
<div>
    <pre>
    git clone git@github.com/andrew-webb07/practice-plan-client.git
    <span>cd</span>practice-plan-client
    </pre>
</div>
<ol start="2">
    <li>Access the data by following the instructions below:</li>
</ol>
<p>
    <a href="https://github.com/andrew-webb07/practice-plan-server" target="_blank">Server Repo</a>
</p>
<ol start="3">
    <li>Launch the client.</li>
</ol>
<div>
    <pre>npm install</pre>
    <pre>npm start</pre>
</div>

#### Demo User Credentials

<div>Username: webbandr</div>
<div>Password: password</div>

### Deployed on heroku
<div>
    <a href="https://practice-plan-client.herokuapp.com/login" target="_blank">Practice Plan Heroku</a>
</div>

#### Created by Andrew Webb

<a href="https://github.com/andrew-webb07/"><img src="https://camo.githubusercontent.com/6aea43d076c7bf00489f1b347caa33fe5c4d84a8af2983804f8702632f2669ec/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6769746875622532302d2532333132313031312e7376673f267374796c653d666f722d7468652d6261646765266c6f676f3d676974687562266c6f676f436f6c6f723d7768697465" alt="Andrew Webb GitHub" data-canonical-src="https://img.shields.io/badge/github%20-%23121011.svg?&amp;style=for-the-badge&amp;logo=github&amp;logoColor=white" style="max-width: 100%;"></a>

<a href="https://www.linkedin.com/in/andrew-webb07/" rel="nofollow"><img src="https://camo.githubusercontent.com/8bb7c1de40aadb0d8eede2add7716932344b30235088d239831fe0e884de8f82/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c696e6b6564696e2532302d2532333030373742352e7376673f267374796c653d666f722d7468652d6261646765266c6f676f3d6c696e6b6564696e266c6f676f436f6c6f723d7768697465" alt="Andrew Webb LinkedIn" data-canonical-src="https://img.shields.io/badge/linkedin%20-%230077B5.svg?&amp;style=for-the-badge&amp;logo=linkedin&amp;logoColor=white" style="max-width: 100%;"></a>
