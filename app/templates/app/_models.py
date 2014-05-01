from django.db import models

from django.utils.text import slugify

from wagtail.wagtailcore.models import Page, Orderable
from wagtail.wagtailcore.fields import RichTextField
from wagtail.wagtailadmin.edit_handlers import FieldPanel

from modelcluster.fields import ParentalKey
from modelcluster.tags import ClusterTaggableManager
from taggit.models import Tag, TaggedItemBase
from south.signals import post_migrate
from wagtail.wagtailadmin.edit_handlers import FieldPanel, MultiFieldPanel, \
    InlinePanel, PageChooserPanel

class CarouselItem(Orderable, models.Model):
    title = models.CharField(max_length=255)
    description = RichTextField()

    page = ParentalKey('<%= appName %>.CarouselPage', related_name="carousel_items")

class CarouselPage(Page):
    body = RichTextField(blank=True)

    indexed_fields = ('body', )
    search_name = "Item Page"

    class Meta:
        verbose_name = "Item Page"


CarouselPage.content_panels = [
    FieldPanel('title', classname="full title"),
    FieldPanel('body', classname="full"),
    InlinePanel(CarouselPage, 'carousel_items', label="Page Items"),
]
