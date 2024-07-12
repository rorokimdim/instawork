# Getting started

Excpected python version is 3.10+.

**Create a python venv to use for the project**

Use your favorite way to create a python virtual environment. Or do
the following:

```bash
mkdir -p ~/venvs && python -m venv ~/venvs/instawork
```

**Activate your venv**

```bash
source ~/venvs/instawork/bin/activate
```

**Install dependencies**

```bash
pip install -r requirements.txt
pip install -r requirements.dev.txt
```

# Running linter

```bash
flake8
```

# Running tests

```bash
./manage.py test tests
```

# Running server locally

```bash
./manage.py runserver
```

Open `http://127.0.0.1:8000/` in your browser, which will list existing members.

To try out the full api, visit `http://127.0.0.1:8000/docs`.
