import ninja

from .member import router as member_router

app = ninja.NinjaAPI()
app.add_router('', member_router)


def get_urls():
    return app.urls
