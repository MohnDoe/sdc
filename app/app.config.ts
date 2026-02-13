export default defineAppConfig({
  ui: {
    button: {
      variants: {
        variant: {
          elevated: 'elevated'
        },
      },
      compoundVariants: [
        {
          color: 'primary',
          variant: 'elevated',
          class: 'bg-primary'
        },
        {
          variant: 'elevated',
          size: 'xs',
          class: 'elevated--xs'
        }
      ],
      defaultVariants: {
        variant: 'solid'
      }
    }
  }
})
