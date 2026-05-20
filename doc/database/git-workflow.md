# Workflow Git - Esportify+

## Objectif

Ce document décrit l'organisation Git prévue pour le projet Esportify+.

---

## Branches principales

### main

La branche `main` contient la version stable du projet.

Elle doit contenir uniquement du code vérifié et prêt à être déployé.

### develop

La branche `develop` sert à regrouper les fonctionnalités avant validation finale.

Elle permet de tester les évolutions avant fusion vers `main`.

---

## Branches de fonctionnalités

Chaque nouvelle fonctionnalité peut être développée dans une branche dédiée.

Exemples :

```txt
feature/auth
feature/events
feature/replay
feature/admin-panel
docs/ecf-complement