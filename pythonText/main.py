def textValid (text):
    import stanza

    stanza.download('ru')
    nlp = stanza.Pipeline('ru')



    doc = nlp(text)

    ans = 0
#    print(doc)

# поменять вывод данных

    a = 0
    b = 0
    for el in doc.sentences:
        print(f' ')
        for ent in el.words:
            if (ent.upos == "PUNCT" or ent.upos == "NUM"):
                continue
            if (ent.head == 0):
                a = ent.id
                print (ent.text)
                continue
            if (ent.head == a):
                b = ent.id
                print (ent.text)
                continue
        for ed in el.words:
            if (ed.upos == "PUNCT" or ed.upos == "NUM"):
                continue
            if (ed.head == b):
                print (ed.text)
