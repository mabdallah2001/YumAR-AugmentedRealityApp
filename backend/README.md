# YumAR: Backend

This Django backend was set up following [these instructions](https://docs.djangoproject.com/en/4.1/intro/tutorial01/).

## Directory Structure

### `app/`

* admin.py: This is where you register your database models.

* apps.py: This is where you configure the app.

* models.py: This is where you create your database models.

* tests.py: This is where you write tests for your models.

* urls.py: This is where we route URLs to certain views (API endpoints)

* views.py: This is where you can create API endpoints to retrieve data.

### `yumar/`

* asgi.py: Entry point for ASGI-compatible web servers.

* settings.py: Settings/configurations for this project.

* urls.py: The URL declarations for this project.

* wsgi.py: Entry point for WSGI-compatible web servers.

### `manage.py`

This is a command-line utility allowing us to interact with the project.

---

## Set Up - Python Virtual Environment

All backend development will be done within a python virtual environment, setup as the following:

1. Create a new environment with the below command. Replace `[path]` with the path of where you would like to store the environment.

        python -m venv [path]

   For example - create it in the current (backend) directory:

        python -m venv `pwd`/yumar-env

2. Activate the environment:

        source [path]/bin/activate

   Using our example:

        source yumar-env/bin/activate

3. Install all dependencies (note: you must have mysql installed on your machine for `mysqlclient` to properly install):

        pip install -r requirements.txt

---      

## Activate Python Virtual Environment

Once you have completed the [setup](#set-up---python-virtual-environment), you can activate the virtual environment with the following command:

    source [path]/bin/activate

All development is to be completed in this virtual environment. When you are finished development, deactivate the virtual environment with the following command:

    deactivate

--- 

## Running the Server

To start the server, run the following command in your python virtual environment:

    python manage.py runserver

On success, you can open the application on your web browser via http://127.0.0.1:8000/. 


### `/admin`

You can navigate to http://127.0.0.1:8000/admin on your browser to access the administration page. Here you can view and edit the current database. You will need to login with your superuser account. To make an account run the below in the terminal:

    python manage.py createsuperuser

### `/api/v1/`

This is the API root of all endpoints.

---       

## Editing Database

To edit the database, follow these steps.

1. Make changes to the model(s) in `app/models.py`

2. Run the below command in your python virtual environment to create migrations for those changes
    
        python manage.py makemigrations app

3. You may run the below command in your python virtual environment to review the sql that Django believes is necessary for the changes 

        python manage.py sqlmigrate app [migration number]

4. Once you are satisfied with the changes, run the below command in your python virtual environment to make the changes

        python manage.py migrate

5. If you would like to include the model to be viewed and edited in the admin page, add the below code to `app/admin.py`

        admin.site.register(ModelName)

---

## Updating Dependencies

If you have made changes to the code such that there is a new dependency (i.e. you ran `pip install <dependency>`), please update the `requirements.txt` file by running the below command in your python virtual environment:

    pip freeze > requirements.txt
