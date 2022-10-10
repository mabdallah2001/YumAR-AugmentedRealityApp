# YumAR: Backend

## Set up

1. Ensure your Python version is >= 3:

        python --version

2. Install all dependencies:

        pip install -r requirements.txt

---        

## Running the Server

To start the server, run the following command:

    python manage.py runserver

On success, you can open the application on your web browser via http://127.0.0.1:8000/. 


### `/admin`

You can navigate to http://127.0.0.1:8000/admin on your browser to access
the administration page. Here you can view and edit the current database. You will need to login with your
superuser account. To make an account run the below in the terminal:

    python manage.py createsuperuser

---       

## Editing Database

To edit the database, follow these steps.

1. Make changes to the model(s) in models.py of a particular app
1. Run the below to create migrations for those changes

    ```
    python manage.py makemigrations [appname]
    ```
1. You may run the below to review the sql that Django believes is necessary for the changes 

    ```
    python manage.py sqlmigrate [appname] [migration number]
    ```
1. Once you are satisfied with the changes, run the below to make the changes

    ```
    python manage.py migrate
    ```
   
1. If you would like to include the model to be viewed and edited in the admin page, add the below code to
`[app]/admin.py`

    ```
    admin.site.register(ModelName)
    ```

---

## Updating Dependencies

If you have made changes to the code such that there is a new dependency (i.e. you ran `pip install <dependency>`), 
please update the `requirements.txt` file with the below command:

    pip freeze > requirements.txt
