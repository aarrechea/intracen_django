# Generated by Django 4.1.5 on 2023-03-27 13:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('evaluations', '0018_competencescore_score_alter_capabilityscore_score'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='competencescore',
            name='score',
        ),
        migrations.AlterField(
            model_name='capabilityscore',
            name='score',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=5),
        ),
    ]
