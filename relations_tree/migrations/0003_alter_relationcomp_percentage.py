# Generated by Django 4.1.5 on 2023-02-20 14:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('relations_tree', '0002_relation_status_relationcap_id_element_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='relationcomp',
            name='percentage',
            field=models.DecimalField(decimal_places=2, max_digits=5),
        ),
    ]
