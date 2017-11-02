## Module Refrigerateur Python
Ici git les fichiers du module de refrigerateur ecrit en python.

***ATTENTION*** ---- le repertoire fridge_env est le fichier de configuration pour l'environnement virtuel python!


## Repertoire Medias Google Bucket

STAGING : gs://staging_facture

IMAGES : gs://image_facture

TEXT : gs://json_facture

## Message Queue
La file de messages est gerees sous Google Pub Sub et est appellee a travers la librairie gcloud python standard.

Les canaux sont:
1. facture_input
2. facture_output

## Scheduler
L'outil utiliser pour scheduler des taches est Gcloud functions. Le lien entre la file de message ainsi que Google OCR est assume par celui-ci * voir diagramme sequence.
