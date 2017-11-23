import os

if __name__ == '__main__':
  for fn in os.listdir('src/ast'):
    print(fn)
    with open('src/ast/'+fn) as f:
        a = f.read().split('\n')
        aux = list()
        for line in a:
            if "throw \"LC error" in line or "throw \"For error" in line:
                tokens = line.split(' ')
                for i in range(len(tokens)):
                    if 'throw' in tokens[i]:
                        tokens[i] = "throw new Error("
                    if ';' in tokens[i]:
                        tokens[i] = tokens[i][:-1]+')'+tokens[i][-1]
                aux.append(' '.join(tokens))
            else:
                aux.append(line)
    with open('src/ast/'+fn,'w') as f:
        f.write('\n'.join(aux))
