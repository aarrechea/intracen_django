# Generated by Django 4.1.5 on 2023-02-25 21:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('countries', '0001_initial'),
        ('industries', '0001_initial'),
        ('companies', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='company',
            name='industry',
        ),
        migrations.RemoveField(
            model_name='company',
            name='sector',
        ),
        migrations.RemoveField(
            model_name='company',
            name='supersector',
        ),
        migrations.AlterField(
            model_name='company',
            name='country',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='countries.country'),
        ),
        migrations.AlterField(
            model_name='company',
            name='subsector',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='industries.subsector'),
        ),
    ]
