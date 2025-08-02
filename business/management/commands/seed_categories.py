from django.core.management.base import BaseCommand
from business.models import Category
from django.utils.text import slugify

class Command(BaseCommand):
    help = 'Seed business categories'

    def handle(self, *args, **kwargs):
        categories = [
            "Salon", "Barbershop", "Automotive", "Gym", "Pharmacy",
            "Electronics", "Restaurant", "Clothing", "Groceries",
            "Bakery", "Books & Stationery", "Mobile Money", "Laundromat",
            "Internet Cafe", "Hardware", "Spa"
        ]

        for name in categories:
            slug = slugify(name)
            category, created = Category.objects.get_or_create(name=name, defaults={'slug': slug})
            if created:
                self.stdout.write(self.style.SUCCESS(f"✅ Added category: {name}"))
            else:
                self.stdout.write(self.style.WARNING(f"⚠️ Already exists: {name}"))
