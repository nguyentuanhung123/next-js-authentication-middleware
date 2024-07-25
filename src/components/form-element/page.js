import { Input } from '@/components/ui/input';

/**
 * Component này được sử dụng component SignUp
 */

const CommonFormElement = ({ currentItem, value, onChange }) => {
    let content = null;

    switch (currentItem.componentType) {
        case 'input':
            content = (
                <Input 
                    name={currentItem.name} 
                    id={currentItem.name} 
                    placeholder={currentItem.placeholder} 
                    value={value} 
                    onChange={onChange}
                    type={currentItem.type}
                />
            );
            break;

        default:
            content = (
                <Input 
                    name={currentItem.name} 
                    id={currentItem.name} 
                    placeholder={currentItem.placeholder} 
                    value={value} 
                    onChange={onChange}
                />
            );
            break;
    }

    return content;
}

export default CommonFormElement;